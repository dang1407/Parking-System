using AutoMapper;
using WebAPI.Domain;

namespace WebAPI.Application
{
    public class UserProfile : Profile
    {
        public UserProfile() 
        {
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<RegisterDTO, User>();
            CreateMap<ForgotPasswordDTO, User>();
        }    
    }
}
