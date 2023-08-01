import { Component, OnInit } from '@angular/core';
import { moviesservice } from './movie.service';
import { movie } from './movie';
import { userFavoritesService } from './userfavorites.service';
import { RegistrationService } from './registration.service';
import { LoginService } from './login.service';
import { movieUser } from './movieUser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { userService } from './userservice';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //isLoggedIn = false;
  searchTerm: string = '';
  latestMovies: movie[] = [];
  searchResults: movie[] = [];
  selectedMovie: movie | undefined;
  showFavorites: boolean = false;
  favoriteMovies: movie[] = [];
   user: movieUser = new movieUser(); 
  searchTermResults: movie[] = [];
  registerForm: FormGroup;
  showPopup: boolean = true;
  showUserProfile = false;
  showSearchResults = false;
  constructor(private movieService: moviesservice,private userFavoritesService: userFavoritesService,
    private registrationService: RegistrationService,private formBuilder: FormBuilder,private userservice: userService,private router: Router) {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  ngOnInit() {
    this.loadLatestMovies();
   
     this.user.firstName = '';
     this.user.lastName = '';
     this.user.email = '';
     this.user.password = '';
  }
  isFavorite(movieId: number): boolean {
    return this.favoriteMovies.some((movie) => movie.id === movieId);
  }

  onOpenModal(movie: movie | null, action: string) {
    const userId = 1; // Replace this with the actual user ID of the logged-in user

    if (action === 'add') {
      if (movie) {
        
        this.userFavoritesService.addToFavorites(movie.id, userId).subscribe(
          (response) => {
            // Handle success
            console.log('Movie added to favorites:', response);

          },
          (error) => {
            console.error('Error adding movie to favorites:', error);
          }
        );
      }
    } else if (action === 'remove') {
      if (movie) {
        // Remove the selected movie from favorites
        this.userFavoritesService.removeFromFavorites(movie.id, userId).subscribe(
          (response) => {
            // Handle success
            console.log('Movie removed from favorites:', response);
          },
          (error) => {
            console.error('Error removing movie from favorites:', error);
          }
        );
      }
    }
  }
  onRegister() {
    // Call the registration service with the user data
    this.registrationService.addUser(this.user).pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        // Show error message to the user
        alert('Error registering user. Please try again later.');
       
        return of(null);
     
      })
    ).subscribe((response) => {
      
      console.log('Registration successful:', response);
      
      alert('Registration successful!');
      this.showPopup = false;
    }
    );
  }
  openUserProfile() {
    const email = this.user.email; // Get the email from the user object which have the value from teh form of registartion

    // Call the user service to get the user data based on the email
    this.userservice.getUserByEmail(email).subscribe(
      (user: movieUser) => {
        // success and show user profile data
        console.log('User Profile:', user);
        this.user = user; // Update the user object with the fetched data
        this.showUserProfile = true; // Show the user profile popup window
      },
      (error) => {
        // Handle error
        console.error('Error fetching user profile:', error);
      }
    );
  }
  // onLogin(loginFormValue: any) {
  //   const email = loginFormValue.email;
  //   const password = loginFormValue.password;

  //   this.loginService.loginUser(email,password).subscribe(
  //     (response) => {
  //       // Handle success
  //       console.log('User logged in successfully:', response);
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error logging in user:', error);
  //     }
  //   );
  // }

  loadLatestMovies() {
    this.movieService.getLatestMovies().subscribe(
      (data) => {
        this.latestMovies = data;
      },
      (error) => {
        console.error('Error fetching latest movies:', error);
      }
    );
  }

  onSearch() {
    if (this.searchTerm) {
      this.movieService.searchMovies(this.searchTerm).subscribe(
        (data) => {
          this.searchResults = data;
          this.showSearchResults = true;
        },
        (error) => {
          console.error('Error searching movies:', error);
        }
      );
    } else {
      this.searchResults = [];
      
    }
  
  }
  hideFavorites() {
    this.showFavorites = false;
  }

  hideSearchResults() {
    this.searchTermResults = [];
      this.showSearchResults = false;
    
  }
  hideUserProfile() {
    this.showUserProfile = false;
  }

  addToFavorites(movieId: number) {
    const userId = 1; 

    this.userFavoritesService.addToFavorites(movieId, userId).subscribe(
      (response) => {
        // Handle success
        console.log('Movie added to favorites:', response);
        // Refresh user favorites list
        this.getUserFavorites(userId);
      },
      (error) => {
        console.error('Error adding movie to favorites:', error);
      }
    );
  }

  removeFromFavorites(movieId: number) {
    const userId = 1; 

    this.userFavoritesService.removeFromFavorites(movieId, userId).subscribe(
      (response) => {
        // Handle success
        console.log('Movie removed from favorites:', response);
        // Refresh user favorites list
        this.getUserFavorites(userId);
      },
      (error) => {
        console.error('Error removing movie from favorites:', error);
      }
    );
  }

  getUserFavorites(userId: number) {
    this.userFavoritesService.getFavoriteMovies(userId).subscribe(
      (response) => {
        this.favoriteMovies = response;
      },
      (error) => {
        console.error('Error while getting movies from favorites:', error);
      }
    );
  }

  onCardClick(movie: movie) {
    // Handle the click event on a movie card
    console.log('Clicked movie:', movie);
    // You can show the details of the clicked movie in a modal or another section of the page
  }

  toggleFavorites() {
    // Toggle the showFavorites flag to show/hide the user favorites section
    this.showFavorites = !this.showFavorites;
    if (this.showFavorites) {
      // If the user favorites section is shown, get the user favorites movies
      const userId = 1; // Replace this with the actual user ID of the logged-in user
      this.getUserFavorites(userId);
    }
  }
}

