using Dapper;
using WebAPI.Application;
using WebAPI.Domain;

namespace WebAPI.Infrastructure
{
    public class UserRepository : BaseCompanyRepository<User>, IUserRepository
    {
        public UserRepository(IUnitOfWork uow) : base(uow)
        {
        }

        public async Task<User?> FindAccountAsync(string username)
        {
            string sql = "Proc_Read_User";
            var param = new DynamicParameters();
            param.Add("p_UserName", username);     
            var user = await Uow.Connection.QuerySingleOrDefaultAsync<User>(sql, param, commandType: System.Data.CommandType.StoredProcedure, transaction: Uow.Transaction);
            return user;
        }
    }
}
