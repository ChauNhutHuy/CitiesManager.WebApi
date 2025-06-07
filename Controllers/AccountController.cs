using CitiesManager.Core.DTO;
using CitiesManager.Core.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CitiesManager.WebApi.Controllers
{
    [AllowAnonymous]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userName;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        public AccountController(UserManager<ApplicationUser> userName, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager)
        {
            _signInManager = signInManager;
            _roleManager = roleManager;
            _userName = userName;
        }
        [HttpPost()]
        public async Task<IActionResult> PostRegister(RegisterDTO registerDTO)
        {
            if(ModelState.IsValid == false)
            {
                string err = String.Join(" | ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)).ToString();
                return Problem(err);
            }
            var user = new ApplicationUser
            {
                UserName = registerDTO.Email,
                Email = registerDTO.Email,
                PhoneNumber = registerDTO.PhoneNumber,
                PersonName = registerDTO.PersonName
            };

            IdentityResult result = await _userName.CreateAsync(user, registerDTO.Password);

            if (result.Succeeded)
            {
               await _signInManager.SignInAsync(user, isPersistent: false);
               return Ok(user);
            }
            else
            {
                string err = String.Join(" | ", result.Errors.Select(e => e.Description)).ToString();
                return Problem(err);
            }
        }
        public async Task<IActionResult> IsEmailAlreadyRegister(string email)
        {
            var user = await _userName.FindByEmailAsync(email);
            if (user != null)
            {
                return Ok(false);
            }
            return Ok(true);
        }
    }
}
