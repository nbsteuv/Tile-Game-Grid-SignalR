namespace TileGame.Business.Models
{
    public class Move
    {
        public char[] CurrentPuzzle { get; set; }
        public int MovedTileIndex { get; set; }
        public string Username { get; set; }
    }
}
