using System;
using System.Collections.Generic;
using System.Text;

namespace TileGame.Business.Models
{
    public class GameSetup
    {
        public char[] PuzzleArray { get; set; }
        public IEnumerable<string> WordList { get; set; }
        public IEnumerable<string> PlayerList { get; set; }
    }
}
