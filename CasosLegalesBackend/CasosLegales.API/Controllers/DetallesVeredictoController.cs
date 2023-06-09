﻿using AutoMapper;
using CasosLegales.API.Models;
using CasosLegales.BusinessLogic.Services;
using CasosLegales.Entities.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CasosLegales.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetallesVeredictoController : ControllerBase
    {
        private readonly CasosLegalesService _casosLegalesService; 
        private readonly IMapper _mapper; 
        
        public DetallesVeredictoController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(DetallesVeredictoViewModel item)
        {
            var response = _casosLegalesService.InsertarDetalleVeredicto(_mapper.Map<tbDetallesVeredictos>(item));
            return Ok(response);
        }

        [HttpGet("ObtenerPorIdVeredicto")]
        public IActionResult ObtenerPorIdVeredicto(int id)
        {
            var response = _casosLegalesService.ObtenerDetalleVeredictoPorIdVeredicto(id);

            response.Data = _mapper.Map<IEnumerable<DetallesVeredictoViewModel>>(response.Data);

            return Ok(response);
        }

        [HttpGet("EliminarTodoPorIdVeredicto")]
        public IActionResult EliminarTodoPorIdVeredicto(int id)
        {
            var response = _casosLegalesService.EliminarTodoDetalleVeredictoPorIdVeredicto(id);

            return Ok(response);
        }

    }
}
