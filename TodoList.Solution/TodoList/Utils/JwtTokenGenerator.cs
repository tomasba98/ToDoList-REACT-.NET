using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoList.Entities.UserEntity;

namespace TodoList.Utils
{
    /// <summary>
    /// Utility class for generating JWT tokens.
    /// </summary>
    public static class JwtTokenGenerator
    {
        /// <summary>
        /// Generates a JWT token for the specified user.
        /// </summary>
        /// <param name="user">The user for whom the token is generated.</param>
        /// <returns>The generated JWT token.</returns>
        public static string GenerateToken(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            byte[] keyBytes = Encoding.UTF8.GetBytes("!£@0#y~9I1.p0goq1£1+12345678901234567890123456789012");

            SigningCredentials signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256);

            Claim[] claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                new Claim("UserId", user.Id.ToString())
            };

            JwtSecurityToken securityToken = new JwtSecurityToken(
                issuer: "ToDoList",
                expires: DateTime.Now.AddSeconds(60),
                claims: claims,
                signingCredentials: signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
    }
}
