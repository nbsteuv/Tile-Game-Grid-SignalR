using System;
using System.Collections.Generic;
using System.Text;

namespace TileGame.Business.Models.ViewModels
{
    public class GameUserViewModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
