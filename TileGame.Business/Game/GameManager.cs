﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TileGame.Business.Game.HubContext;
using TileGame.Business.Models;
using static TileGame.Business.Enums;

namespace TileGame.Business.Game
{
    public class GameManager : IGameManager
    {
        private readonly IGameData _gameData;
        private readonly IGameHubContext _gameHubContext;
        private readonly IMoveHandlerFactory _moveHandlerFactory;

        public GameManager(IGameData gameData, IGameHubContext gameHubContext, IMoveHandlerFactory moveHandlerFactory)
        {
            _gameData = gameData;
            _gameHubContext = gameHubContext;
            _moveHandlerFactory = moveHandlerFactory;
        }

        public async Task MakeConnectionAsync(string username, string connectionId, string password, GameType gameType, int wordLength)
        {
            var connection = _gameData.MakeConnection(username, connectionId, password, gameType, wordLength);

            var users = GetConnectionUsers(connection);

            var sendStatusTasks = users.Select(async user =>
            {
                var status = GetConnectionStatus(connectionId, connection);

                await _gameHubContext.SendStatus(connectionId, status);
            });

            await Task.WhenAll(sendStatusTasks);

            await TryStartGameAsync(connection);
        }

        private async Task TryStartGameAsync(Connection connection)
        {
            if (!connection.Players.Any())
            {
                return;
            }

            if (GetConnectionStatus(connection.Players.FirstOrDefault().ConnectionId, connection) != ConnectionStatus.Ready)
            {
                return;
            }

            CreateGame(connection);

            var users = GetConnectionUsers(connection);

            var wordList = connection.WordList.Select<Word, string>(word => word.Text);

            var startGameTasks = users.Select(async user =>
            {
                var gameSetup = new GameSetup
                {
                    PuzzleArray = user.Puzzle,
                    WordList = wordList,
                    PlayerList = connection.Players.Select(player => player.Username)
                };

                await _gameHubContext.SendStartGame(user.ConnectionId, gameSetup);
            });

            await Task.WhenAll(startGameTasks);
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

        public void CreateGame(Connection connection)
        {
            if(connection.WordLength != 4 && connection.WordLength != 5)
            {
                throw new Exception("Invalid game size");
            }

            var wordList = _gameData.GetWordList(connection.WordLength);

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

        public void Move(string username, string connectionId, Move move)
        {
            var user = _gameData.GetUser(connectionId, username);

            //TODO: Build user's puzzle based on most recent move--this is a security vulnerability
            user.Puzzle = move.CurrentPuzzle;

            var connection = _gameData.GetConnectionByPlayer(user);

            var moveHandler = _moveHandlerFactory.CreateMoveHandler(connection, user, _gameHubContext, _gameData);

            moveHandler.HandleMove(move);
        }

        public void Disconnect(string connectionId)
        {
            var connections = _gameData.GetAllConnectionsByPlayerConnectionId(connectionId);

            var users = new List<User>();

            connections.ForEach(connection =>
            {
                connection.Players.ForEach(player => users.Add(player));
                connection.Watchers.ForEach(watcher => users.Add(watcher));
            });

            users.ForEach(user => _gameHubContext.SendStatus(user.ConnectionId, ConnectionStatus.Disconnected));

            _gameData.EndAllGamesByPlayerConnectionId(connectionId);
        }
    }
}
