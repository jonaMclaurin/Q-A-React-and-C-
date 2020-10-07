using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using QandA.Data.Models;

namespace QandA.Data
{
    public class DataRepository: IDataRepository
    {
        private readonly string _connectionString;

        public DataRepository(IConfiguration configuration)
        {
            var builder = new SqlConnectionStringBuilder(configuration["ConnectionStrings:DefaultConnection"]);
            builder.Password = configuration["DbPassword"];
            _connectionString = builder.ConnectionString;
        }

        public AnswerGetResponse GetAnswer(int answerId)
        {
            using( var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.QueryFirstOrDefault<AnswerGetResponse>(
                      @"EXEC dbo.Answer_Get_ByAnswerId @AnswerId = @AnswerId",
                      new object[]
                    );
            }
        }

        public QuestionGetSingleResponse GetQuestion(int questionId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var question =
                    connection.QueryFirstOrDefault<QuestionGetSingleResponse>(
                          @"EXEC dbo.Question_GetSingle @QuestionId = @QuestionId",
                          new { QuestionId = questionId }
                        );
                if (question != null)
                {
                    question.Answers =
                        connection.Query<AnswerGetResponse>(
                              @"EXEC dbo.Answer_Get_ByQuestionId
                                @QuestionId = @QuestionId",
                              new { QuestionId = questionId }
                            );
                }

                return question;
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestions()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<QuestionGetManyResponse>(
                      @"EXEC dbo.Questin_GetMany"
                    );
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<QuestionGetManyResponse>(
                      @"EXEC dbo.Question_Get_Many_BySearch @Search = @Search",
                      new { Search = search }
                    );
            }
        }

        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.Query<QuestionGetManyResponse>(
                      "EXEC dbo.Question_GetUnanswered"
                    );
            }
        }

        public bool QuestionExists(int questionId)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                return connection.QueryFirst<bool>(
                    @"EXEC dbo.Question_Exists @QuestionId = @QuestionId",
                    new { QuestionId = questionId }
                    );
            }
        }
    }
}
