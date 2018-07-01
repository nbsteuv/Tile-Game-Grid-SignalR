using System.Collections.Generic;

namespace TileGame.Business.Models
{
    public class IncomingMove
    {
        public List<int> MoveHistory { get; set; }
        public string Username { get; set; }
    }
}
