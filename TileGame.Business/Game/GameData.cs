using System;
using System.Collections.Generic;
using System.Linq;
using TileGame.Business.Data;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public class GameData : IGameData
    {
        private readonly IApplicationDbContext _context;

        private readonly List<Connection> _connections;

        public GameData(IApplicationDbContext context)
        {
            _context = context;
            _connections = new List<Connection>();
        }

        public Connection MakeConnection(string username, string connectionId, string password, GameType gameType)
        {
            var user = new User
            {
                Username = username,
                ConnectionId = connectionId
            };

            if(_connections.Any(connection => connection.Players.Any(player => player.ConnectionId == connectionId)))
            {
                //User is already in a connection

                var currentConnection = _connections.First(connection => connection.Players.Any(player => player.ConnectionId == connectionId));

                return currentConnection;
            }

            if(!string.IsNullOrEmpty(password) && _connections.Any(c => c.Password == password))
            {
                //User has entered an existing password to connect to a friend

                var requestedConnection = _connections.First(connection => connection.Password == password);

                if(requestedConnection.Players.Count == 1 && requestedConnection.Multiplayer == true)
                {
                    requestedConnection.Players.Add(user);
                } else
                {
                    requestedConnection.Watchers.Add(user);
                }

                return requestedConnection;
            }

            if(string.IsNullOrEmpty(password) && _connections.Any(connection => connection.Players.Count == 1 && connection.Multiplayer == true))
            {
                //Connect request to the next waiting player

                var waitingConnection = _connections.First(connection => connection.Players.Count == 1);

                waitingConnection.Players.Add(user);

                return waitingConnection;
            }

            //Found no connections to return. Create new connection for player

            var newConnection = new Connection
            {
                Players = new List<User>(),
                Watchers = new List<User>()
            };

            newConnection.Players.Add(user);

            newConnection.Password = password;

            newConnection.Multiplayer = gameType == GameType.Race;

            _connections.Add(newConnection);

            return newConnection;
        }

        public List<Word> GetWordList(int baseLength)
        {
            var fullWords = _context.Words
                .Where(word => word.LetterCount == baseLength)
                .OrderBy(random => Guid.NewGuid())
                .Take(baseLength - 1);

            var shortWord = _context.Words
                .Where(word => word.LetterCount == baseLength - 1)
                .OrderBy(random => Guid.NewGuid())
                .Take(1);

            var wordList = fullWords.Concat(shortWord).ToList();

            return wordList;
        }
    }
}
