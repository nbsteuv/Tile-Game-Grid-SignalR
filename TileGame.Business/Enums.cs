namespace TileGame.Business
{
    public static class Enums
    {
        public enum ConnectionStatus
        {
            Ready = 1,
            Waiting,
            Watching,
            Disconnected
        }

        public enum GameType
        {
            Single = 1,
            Race
        }
    }
}
