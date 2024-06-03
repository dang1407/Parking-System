using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Application;
using WebAPI.Domain;

namespace WebAPI.Controllers
{
    public class AccountController : BaseCompanyController<AccountDTO, AccountCreateDTO, AccountUpdateDTO>
    {
        private readonly IAccountService _userService; 
        public AccountController(IAccountService userService) : base(userService) {
            _userService = userService; 
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] AccountCreateDTO createDTO, Guid companyId)
        {
            var result = await _userService.RegisterAsync(createDTO, companyId);  
            return Ok(result);  
        }
    }
}
