using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace AgendaMedicaAPI.Models
{
    public class Appointment
    {
        [Key]
        public int ID_Consuta { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string NomeCompleto { get; set; }
        [Column(TypeName = "Date")]
        [Required]
        public DateTime DataNascimento { get; set; }
        [Column(TypeName = "DateTime")]
        [Required]
        public DateTime InicioConsulta { get; set; }
        [Required]
        [Column(TypeName = "DateTime")]
        public DateTime FimConsulta { get; set; }
        [Column(TypeName = "nvarchar(300)")]
        public string Texto { get; set; }
        //public int Id_Consulta { get; internal set; }
        //public int DataInicio { get; internal set; }
    }
}
