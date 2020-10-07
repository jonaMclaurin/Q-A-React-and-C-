using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QandA.Data.Models;


namespace QandA.Data
{
    public interface IDataRepository
    {
        //GET METHODS

        IEnumerable<QuestionGetManyResponse> GetQuestions();

        IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch(string search);

        IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions();

        QuestionGetSingleResponse GetQuestion(int questionId);

        bool QuestionExists(int questionId);

        AnswerGetResponse GetAnswer(int answerId);

        //POST METHODS

        QuestionGetSingleResponse PostQuestion(QuestionPostRequest question);

        QuestionGetSingleResponse PutQuestion(int questionId, QuestionPutRequest question);

        void DeleteQuestion(int questionId);

        AnswerGetResponse PostAnswer(AnswerPostRequet answer); 

    }
}
