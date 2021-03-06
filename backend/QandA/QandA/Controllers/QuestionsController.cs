﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using QandA.Data;
using QandA.Data.Models;
using Microsoft.AspNetCore.SignalR;
using QandA.Hubs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QandA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase 
    {
        private readonly IDataRepository _dataRepository;
        private readonly IHubContext<QuestionsHub> _questionHubContext;

        public QuestionsController(IDataRepository dataRepository,
            IHubContext<QuestionsHub> questionHubContext)
        {
            _dataRepository = dataRepository;
            _questionHubContext = questionHubContext;
        }

        [HttpGet]
        public IEnumerable<QuestionGetManyResponse>
            GetQuestions(
            string search,
            bool includeAnswers,
            int page = 1,
            int pageSize = 20
            )
        {
            if (string.IsNullOrEmpty(search))
            {
                if (includeAnswers)
                {
                    return _dataRepository.GetQuestionsWithAnswers();
                } else
                {
                    return _dataRepository.GetQuestions();
                }
            }
            else
            {
                return _dataRepository.GetQuestionsBySearchWithPaging(
                    search,
                    page,
                    pageSize);
            }
            
        }

        [HttpGet("unanswered")]
        public IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions()
        {
            return _dataRepository.GetUnansweredQuestions();
        }

        [HttpGet("{questionId}")]
        public ActionResult<QuestionGetSingleResponse> GetQuestion(int questionId)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }
            return question;          
        }

        [HttpPost]
        public ActionResult<QuestionGetSingleResponse>
            PostQuestion(QuestionPostRequest questionPostRequest)
        {
            var savedQuestion = _dataRepository.PostQuestion(new QuestionPostFullRequest
            {
                Title = questionPostRequest.Title,
                Content = questionPostRequest.Content,
                UserId = "1",
                UserName = "bob.test@test.com",
                Created = DateTime.UtcNow
            });

            return CreatedAtAction(nameof(GetQuestion),
                new { questionId = savedQuestion.QuestionId },
                savedQuestion);
        }

        [HttpPut("{questionId}")]
        public ActionResult<QuestionGetSingleResponse>
            PutQuestion(int questionId, QuestionPutRequest questionPutRequest)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }

            questionPutRequest.Title =
                string.IsNullOrEmpty(questionPutRequest.Title) ?
                  question.Title :
                  questionPutRequest.Title;
            questionPutRequest.Content =
                string.IsNullOrEmpty(questionPutRequest.Content) ?
                  question.Content :
                  questionPutRequest.Content;

            var savedQuestion = _dataRepository.PutQuestion(questionId, questionPutRequest);
            return savedQuestion;
            
        }

        [HttpDelete("{questionId}")]
        public ActionResult DeleteQuestion(int questionId)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if(question == null)
            {
                return NotFound();
            }
            _dataRepository.DeleteQuestion(questionId);
            return NoContent();
        }

        [HttpPost("answer")]
        public ActionResult<AnswerGetResponse> PostAnswer(AnswerPostRequet answerPostRequet)
        {
            var questionExists = _dataRepository.QuestionExists(answerPostRequet.QuestionId.Value);
            if(!questionExists)
            {
                return NotFound();
            }
            var savedAnswer = _dataRepository.PostAnswer(new AnswerPostFullRequest
                {
                    QuestionId = answerPostRequet.QuestionId.Value,
                    Content = answerPostRequet.Content,
                    UserId = "1",
                    UserName = "bob.test@test.com",
                    Created = DateTime.UtcNow
                }
            );

            _questionHubContext.Clients.Group(
                $"Question-{answerPostRequet.QuestionId.Value}")
                .SendAsync(
                  "ReceiveQuestion",
                  _dataRepository.GetQuestion(
                      answerPostRequet.QuestionId.Value));

            return savedAnswer;
        }
    }
}
