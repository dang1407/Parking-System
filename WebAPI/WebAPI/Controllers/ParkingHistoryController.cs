using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebAPI.Application;
using WebAPI.Domain;

namespace WebAPI.Controllers
{
    [Authorize(Roles = "admin")]
    public class ParkingHistoryController : BaseCompanyController<ParkingHistoryDTO, ParkingHistoryCreateDTO, ParkingHistoryUpdateDTO>
    {
        public ParkingHistoryController(IParkingHistoryService parkingHistoryService) : base(parkingHistoryService)
        {

        }

        [HttpGet]
        [Route("statistical")]
        public async Task<IActionResult> GetParkingHistoryStatisticalAsync(string year, int? vehicle)
        {
            Guid companyId = Guid.Parse(HttpContext.User.FindFirstValue("CompanyId"));
            return Ok();
        }
    }
}
