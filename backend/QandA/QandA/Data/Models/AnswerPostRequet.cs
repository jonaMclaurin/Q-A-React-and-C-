using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace QandA.Data.Models
{
    public class AnswerPostRequet
    {
        [Required]
        public int? QuestionId { get; set; }
        [Required]
        public string Content { get; set; }
        
    }
}
