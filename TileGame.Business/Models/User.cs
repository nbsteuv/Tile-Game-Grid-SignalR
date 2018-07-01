using System.Collections.Generic;

namespace TileGame.Business.Models
{
    public class User
    {
        public string Username { get; set; }
        public string ConnectionId { get; set; }
        public char[] Puzzle { get; set; }
        public List<int> MoveHistory { get; set; }
    }
}
