using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Application;
using WebAPI.Domain;

namespace WebAPI.Infrastructure
{
    public class CompanyRepository : BaseCompanyRepository<Company>, ICompanyRepository
    {
        public CompanyRepository(IUnitOfWork unitOfWork) : base(unitOfWork) { }

        public async Task<List<Company>> GetAllAsync()
        {
            string sql = "SELECT * FROM Company";
            var result = await Uow.Connection.QueryAsync<Company>(sql, transaction: Uow.Transaction);
            return result.ToList(); 
        }
    }
}
