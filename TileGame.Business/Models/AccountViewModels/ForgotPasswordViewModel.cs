using System.ComponentModel.DataAnnotations;

namespace TileGame.Business.Models.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
