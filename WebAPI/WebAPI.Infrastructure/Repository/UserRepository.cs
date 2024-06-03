using Dapper;
using System.Net.WebSockets;
using System.Reflection;
using WebAPI.Application;
using WebAPI.Domain;

namespace WebAPI.Infrastructure
{
    public class UserRepository : BaseCompanyRepository<Account>, IUserRepository
    {
        public UserRepository(IUnitOfWork uow) : base(uow)
        {
        }

        public async Task<Account?> FindAccountAsync(string username)
        {
            string sql = "Proc_Read_User";
            var param = new DynamicParameters();
            param.Add("p_UserName", username);   
     
            var user = await Uow.Connection.QuerySingleOrDefaultAsync<Account>(sql, param, commandType: System.Data.CommandType.StoredProcedure, transaction: Uow.Transaction);
            return user;
        }

        public async Task<int> RegisterAsync(Account account)
        {
            string sql = "Proc_Create_Account";
            var param = new DynamicParameters();
            Type type = account.GetType();
            PropertyInfo[] properties = type.GetProperties();
            foreach (var property in properties)
            {
                param.Add("p_" + property.Name, property.GetValue(account));
            }
            var result = await Uow.Connection.QueryFirstOrDefaultAsync(sql, param, commandType: System.Data.CommandType.StoredProcedure, transaction: Uow.Transaction);
            return 0;
        }
    }
}
