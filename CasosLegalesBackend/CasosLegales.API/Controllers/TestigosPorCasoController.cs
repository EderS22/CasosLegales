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
    public class TestigosPorCasoController : ControllerBase
    {
        private readonly CasosLegalesService _casosLegalesService; 
        private readonly IMapper _mapper; public 
        
        TestigosPorCasoController(CasosLegalesService casosLegalesService, IMapper mapper)
        {
            _casosLegalesService = casosLegalesService;
            _mapper = mapper;
        }

        [HttpPost("Insertar")]
        public IActionResult Insert(TestigoPorCasoViewModel item)
        {
            var response = _casosLegalesService.InsertarTestigoPorCaso(_mapper.Map<tbTestigosPorCaso>(item));
            return Ok(response);
        }
    }
}
