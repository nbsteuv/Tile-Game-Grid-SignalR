using System.Collections.Generic;

namespace TileGame.Business.Models
{
    public class Connection
    {
        public string Password { get; set; }
        public bool Multiplayer { get; set; }
        public List<User> Players { get; set; }
        public List<User> Watchers { get; set; }
        public List<Word> WordList { get; set; }
        public char[] Key { get; set; }
    }
}
