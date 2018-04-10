using System.Collections.Generic;

namespace TileGame.Business.Models
{
    public class Connection
    {
        public string Password { get; set; }
        public List<User> Players { get; set; }
        public List<User> Watchers { get; set; }
    }
}
