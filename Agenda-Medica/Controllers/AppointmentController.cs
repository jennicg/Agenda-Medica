using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AgendaMedicaAPI.Models;

namespace AgendaMedicaAPI.Controllers

{

//ROTAS DA API
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppointmentContext _context;

        public AppointmentController(AppointmentContext context)
        {
            _context = context;
        }
       // int i = 0;
        // GET: api/Consultas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetConsultas()
        {
            return await _context.Appointment.ToListAsync();
        }

        // GET: api/Consultas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var consulta = await _context.Appointment.FindAsync(id);

            if (consulta == null)
            {
                return NotFound();
            }

            return consulta;
        }

        // PUT: api/Consultas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            if (id != appointment.Id_Consulta)
            {
                return BadRequest();
            }
            if (appointment.Dat_Inicio_Consulta < appointment.Dat_Fim_Consulta)
            {
                return BadRequest();
            }

            if (_context.Appointment.Any(x => x.Dat_Inicio_Consulta <= appointment.Dat_Inicio_Consulta && x.Dat_Fim_Consulta >= appointment.Dat_Fim_Consulta))
            {
                return BadRequest();

            }
            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsultaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Consultas
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            Appointment con = new Appointment();



            _context.Appointment.Add(appointment);
            await _context.SaveChangesAsync();

            if (appointment.Dat_Inicio_Consulta < appointment.Dat_Fim_Consulta)
            {
                return BadRequest();
            }

            if (_context.Appointment.Any(x => x.Dat_Inicio_Consulta <= appointment.Dat_Inicio_Consulta && x.Dat_Fim_Consulta >= appointment.Dat_Fim_Consulta))
            {
                return BadRequest();

            }
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointment.Remove(appointment);
            await _context.SaveChangesAsync();


            return CreatedAtAction("GetConsulta", new { id = appointment.Id_Consulta }, appointment);
        }

        // DELETE: api/Consultas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Appointment>> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointment.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointment.Remove(appointment);
            await _context.SaveChangesAsync();

            return appointment;
        }

        private bool ConsultaExists(int id)
        {
            return _context.Appointment.Any(e => e.Id_Consulta == id);
        }
    }
}
