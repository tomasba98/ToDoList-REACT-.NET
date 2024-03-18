﻿using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TodoList.Utils;

using TodoList.Entities.UserEntity;
public static class JwtTokenGenerator
{
    public static string GenerateToken(User user)
    {
        byte[] keyBytes = Encoding.UTF8.GetBytes("!£@0#y~9I1.p0goq1£1+12345678901234567890123456789012");

        SigningCredentials signingCredentials = new(
                new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256);


        Claim[] claims = new[]
            {
             new Claim(JwtRegisteredClaimNames.Name, user.UserName),
             new Claim("UserId", user.Id.ToString())
        };

        JwtSecurityToken securityToken = new(
            issuer: "ToDoList",
            expires: DateTime.Now.AddSeconds(60),
            claims: claims,
            signingCredentials: signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
}