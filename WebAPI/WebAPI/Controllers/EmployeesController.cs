using Dapper;
using Microsoft.AspNetCore.Mvc;
using static Dapper.SqlMapper;
using Microsoft.AspNetCore.Http;
using System.Text.RegularExpressions;
using WebAPI.Domain;
using WebAPI.Application;
using OfficeOpenXml;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    //[Authorize(Roles = "admin")]
    public class EmployeesController : BaseCompanyController<EmployeeDTO, EmployeeCreateDTO, EmployeeUpdateDTO>
    {
        private readonly IEmployeeService _employeeService;
        private readonly ICloudinaryService _cloudinaryService; 

        public EmployeesController(IEmployeeService employeeService, ICloudinaryService cloudinaryService) : base(employeeService)
        {
            _employeeService = employeeService;
            _cloudinaryService = cloudinaryService; 
        }

        [HttpPost]
        [Route("{companyId}")]
        public override async Task<IActionResult> InsertAsync( [FromForm] EmployeeCreateDTO employeeCreateDTO, Guid companyId)
        {
            Console.WriteLine("Call Employee");
            if(employeeCreateDTO.AvatarFile != null) 
            {
                string imageUrl = _cloudinaryService.UpLoadImageToCloudinaryAsync(employeeCreateDTO.AvatarFile, "Garage");
                if(string.IsNullOrEmpty(imageUrl)) 
                {
                    return BadRequest("Cannot upload image to cloudinary");
                }
                employeeCreateDTO.AvatarLink = imageUrl;    
            }
            var result = await _employeeService.InsertAsync( employeeCreateDTO, companyId);
            return Ok(result);  
        }


        /// <summary>
        /// Hàm lấy mã nhân viên mới
        /// </summary>
        /// <returns>Mã nhân viên mới (string)</returns>
        /// Created by: nkmdang (27/09/2023)
        [HttpGet]
        [Route("NewEmployeeCode/{companyId}")]
        public async Task<string> GetNewEmployeeCodeAsync(Guid companyId)
        {
            var result = await _employeeService.GetNewEmployeeCodeAsync(companyId);
            return result;
        }

        //[HttpGet]
        //[Route("EmployeesExcel")]
        //public async Task<dynamic> ExportCurrentPageExcelAsync(int page, int pageSize, string? employeeProperty)
        //{
        //    List<EmployeeDTO> employees = new List<EmployeeDTO>();
        //    // Gọi dữ liệu từ trang hiện tại đang xem
        //    if (string.IsNullOrEmpty(employeeProperty))
        //    {
        //        employees = await _employeeService.GetEmployeesByPaginationAsync(page, pageSize);
        //    }
        //    else
        //    {

        //        // Tìm theo mã nhân viên
        //        var employeeGetByEmployeeCode = await _employeeService.GetEmployeeByEmployeeCodeAsync(employeeProperty);
        //        if (employeeGetByEmployeeCode != null)
        //        {
        //            employees.Add(employeeGetByEmployeeCode);
        //        }

        //        // Tìm theo tên
        //        var employeesGetByFullName = await _employeeService.GetEmployeeByFullNameAsync(page, pageSize, employeeProperty);
        //        if (employeesGetByFullName != null)
        //        {
        //            employees.AddRange(employeesGetByFullName);
        //        }

        //        // Tìm theo số điện thoại
        //        var employeeGetByMobile = await _employeeService.GetEmployeeByMobileAsync(page, pageSize, employeeProperty);
        //        if (employeeGetByMobile != null)
        //        {
        //            employees.Add(employeeGetByMobile);
        //        }
        //    }

        //    // Lấy ra dữ liệu excel dạng byte
        //    var excelBytes = await _employeeService.ExportEmployeeExcelAsync(employees, page, pageSize  );

        //    return File(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Danh_sach_nhan_vien.xlsx");
        //}


    }
}
