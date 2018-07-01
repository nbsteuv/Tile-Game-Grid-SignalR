using System.Collections.Generic;

namespace TileGame.Business.Models
{
    public class GameSetup
    {
        public char[] PuzzleArray { get; set; }
        public IEnumerable<string> WordList { get; set; }
        public IEnumerable<string> PlayerList { get; set; }
    }
}
