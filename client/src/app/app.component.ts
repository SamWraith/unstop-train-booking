import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  seats: any[] = [];
  numberOfSeats: number = 1;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // ! Get the seats when the component is initialized
    this.getSeats();
  }
 // ! to get the seats from the server
  getSeats() {
    this.http.get<any[]>('https://unstop-train-booking-api.vercel.app/api/v1/seats').subscribe(data => {
      this.seats = data;
    });
  }
 // ! to book the seats
  bookSeats() {
    if (this.numberOfSeats < 1 || this.numberOfSeats > 7) {
      alert('Please enter a valid number of seats (1-7).');
      return;
    }

    this.http.post('https://unstop-train-booking-api.vercel.app/api/v1/seats/book-seats', { numberOfSeats: this.numberOfSeats })
      .subscribe(
        (response: any) => {
          alert(`Booked seats: ${response.seats.join(', ')}`);
          this.getSeats(); // ! Refresh seat layout
        },
        (error) => {
          alert(error.error);
        }
      );
  }
}


