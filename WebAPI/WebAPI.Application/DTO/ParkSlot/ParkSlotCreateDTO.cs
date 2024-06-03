using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Application   
{
    public class ParkSlotCreateDTO : BaseDTO
    {
        public Guid ParkSlotId { get; set; }
        public int Vehicle { get; set; }
        public string? LicensePlate { get; set; } = string.Empty;
        public DateTimeOffset? VehicleInDate { get; set; }
    }
}
