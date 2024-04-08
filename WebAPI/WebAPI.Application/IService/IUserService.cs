using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Application
{
    public interface IUserService : IBaseCompanyService<UserDTO, RegisterDTO, ForgotPasswordDTO>
    {
        Task<UserDTO?> FindAccountAsync(UserDTO loginDTO);
        Task RegisterAsync(RegisterDTO registerDTO);    
        Task ForgotPassWordAsync(ForgotPasswordDTO forgotPasswordDTO);  
    }
}
