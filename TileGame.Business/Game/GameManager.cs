using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public class GameManager : IGameManager
    {
        private readonly IGameData _gameData;
        private readonly IGameHub _gameHub;
        private readonly IMoveHandlerFactory _moveHandlerFactory;

        public GameManager(IGameData gameData, IGameHub gameHub, IMoveHandlerFactory moveHandlerFactory)
        {
            _gameData = gameData;
            _gameHub = gameHub;
            _moveHandlerFactory = moveHandlerFactory;
        }

        public void MakeConnection(string username, string connectionId, string password, GameType gameType, int wordLength)
        {
            var connection = _gameData.MakeConnection(username, connectionId, password, gameType);

            var users = GetConnectionUsers(connection);

            //TODO: Implement another method to ensure completion for all users before game starts
            users.AsParallel().ForAll(async user =>
            {
                var status = GetConnectionStatus(user.ConnectionId, connection);

                await _gameHub.SendStatus(user.ConnectionId, status);
            });

            TryStartGame(connection, wordLength);
        }

        private void TryStartGame(Connection connection, int wordLength)
        {
            if (!connection.Players.Any())
            {
                return;
            }

            if (GetConnectionStatus(connection.Players.FirstOrDefault().ConnectionId, connection) != ConnectionStatus.Ready)
            {
                return;
            }

            CreateGame(connection, wordLength);

            var users = GetConnectionUsers(connection);

            var wordList = connection.WordList.Select<Word, string>(word => word.Text);

            users.AsParallel().ForAll(async user =>
            {
                await _gameHub.SendStartGame(user.ConnectionId, user.Puzzle, wordList);
            });
        }

        private ConnectionStatus GetConnectionStatus(string connectionId, Connection connection)
        {
            if(connection.Players.Count < 2 && connection.Multiplayer == true)
            {
                return ConnectionStatus.Waiting;
            }

            if(connection.Players.Any(player => player.ConnectionId == connectionId))
            {
                return ConnectionStatus.Ready;
            }

            return ConnectionStatus.Watching;
        }

        private List<User> GetConnectionUsers(Connection connection)
        {
            var users = new List<User>();

            connection.Players.ForEach(player => users.Add(player));

            connection.Watchers.ForEach(watcher => users.Add(watcher));

            return users;
        }

        public void CreateGame(Connection connection, int wordLength)
        {
            if(wordLength != 4 && wordLength != 5)
            {
                throw new Exception("Invalid game size");
            }

            var wordList = _gameData.GetWordList(wordLength);

            var key = BuildCharArray(wordList);

            var puzzle = ShuffleCharArray(key);

            _gameData.AddGameToConnection(connection, wordList, key);

            AddPuzzleToUsers(connection, puzzle);
        }

        //TODO: Put these puzzle methods into a puzzle service

        private char[] BuildCharArray(List<Word> wordList)
        {
            var wordString = new StringBuilder("");

            wordList.ForEach(word => wordString.Append(word.Text.Trim()));

            wordString.Append(" ");

            var charArray = wordString.ToString().ToCharArray();

            return charArray;
        }

        private char[] ShuffleCharArray(char[] charArray)
        {
            var shuffledCharArray = (char[])charArray.Clone();

            for(var i = 0; i < shuffledCharArray.Length - 1; i++)
            {
                var tmp = shuffledCharArray[i];
                var random = new Random();
                var j = random.Next(0, shuffledCharArray.Length - 1);
                shuffledCharArray[i] = shuffledCharArray[j];
                shuffledCharArray[j] = tmp;
            }

            return shuffledCharArray;
        }

        private void AddPuzzleToUsers(Connection connection, char[] puzzle)
        {
            var users = GetConnectionUsers(connection);

            users.ForEach(user => user.Puzzle = puzzle);
        }

        public void Move(Move move, string username, string connectionId)
        {
            var user = _gameData.GetUser(connectionId, username);

            user.Puzzle = move.CurrentPuzzle;

            var connection = _gameData.GetConnectionByPlayer(user);

            //var moveHandler = _moveHandlerFactory.CreateMoveHandler(connection, user);

            //moveHandler.HandleMove(move);
        }
    }
}
