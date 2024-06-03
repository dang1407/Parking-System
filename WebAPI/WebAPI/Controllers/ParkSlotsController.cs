using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebAPI.Application;

namespace WebAPI.Controllers
{
    [Authorize(Roles = "admin,employee")]
    public class ParkSlotsController : BaseCompanyController<ParkSlotDTO, ParkSlotCreateDTO, ParkSlotUpdateDTO> 
    {
        private readonly IParkSlotService _parkSlotService;
        public ParkSlotsController(IParkSlotService parkSlotService) : base(parkSlotService) 
        {
            _parkSlotService = parkSlotService; 
        }

        [HttpGet]
        [Route("statistical/{parkingId}")] 
        public async Task<IActionResult> GetParkSlotInforAsync(Guid parkingId)
        {
            var result = await _parkSlotService.GetParkSlotByParkingIdAsync(parkingId);
            int bikecycle = 0, mototbike = 0, car = 0;
            foreach (var item in result) 
            { 
                if(item.Vehicle == 0)
                {
                    bikecycle++;    
                } else if(item.Vehicle == 1) 
                {
                    mototbike++;
                } 
                else if(item.Vehicle == 2)
                {
                    car++;  
                }  
            }
            return Ok(new
            {
                ModelData = result,
                Bikecycle = bikecycle,
                Motorbike = mototbike, 
                Car = car    
            });
        }
    }
}
