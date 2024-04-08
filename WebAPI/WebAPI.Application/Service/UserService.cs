using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Domain;

namespace WebAPI.Application
{
    public class UserService : BaseCompanyService<User, UserDTO, RegisterDTO, ForgotPasswordDTO>, IUserService
    {
        private readonly IUserRepository _userRepository;   
        public UserService(IUserRepository userRepository, IMapper mapper) : base(userRepository, mapper)
        {  
            _userRepository = userRepository;
        }

        public Task ForgotPassWordAsync(ForgotPasswordDTO forgotPasswordDTO)
        {
            throw new NotImplementedException();
        }

        public Task RegisterAsync(RegisterDTO registerDTO)
        {
            throw new NotImplementedException();
        }
        public async Task<UserDTO?> FindAccountAsync(UserDTO loginDTO)
        {
            // Tìm thông tin tài khoản trong db
            var findAccount = await _userRepository.FindAccountAsync(loginDTO.UserName);

            return MapEntityToDTO(findAccount);
        }
    }
}
