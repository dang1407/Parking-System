using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application;

namespace WebAPI.Controllers
{
    public class CompanysController : BaseCompanyController<CompanyDTO, CompanyCreateDTO, CompanyUpdateDTO>
    {
        private readonly ICompanyService _companyService;   
        public CompanysController(ICompanyService baseCompanyService) : base(baseCompanyService)
        {
            _companyService = baseCompanyService;   
        }

        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllCompanyAsync()
        {
            var result = await _companyService.GetAllAsync();
            return Ok(result);  
        }
    }
}
