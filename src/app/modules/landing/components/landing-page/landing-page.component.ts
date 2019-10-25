import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  movieSlides = [
    [
      {
        title: '3 hours of concept art',
        poster:
          'https://uproxx.com/wp-content/uploads/2018/01/honest-movie-posters-2018-blade-runner-2049_college-humor.jpg?quality=100',
        genres: 'action',
        restriction: '18'
      },
      {
        title: '3 hours of concept art',
        poster:
          'https://i.pinimg.com/originals/a0/86/b7/a086b774291cf85b5810372bd83815b3.jpg',
        genres: 'action',
        restriction: '18'
      },
      {
        title: '3 hours of concept art',
        poster:
          'https://www.bestmovieposters.co.uk/wp-content/uploads/2019/01/bPhD22m-.jpeg',
        genres: 'action',
        restriction: '18'
      }
    ],
    [
      {
        title: '3 hours of concept art',
        poster:
          'https://uproxx.com/wp-content/uploads/2018/01/honest-movie-posters-2018-blade-runner-2049_college-humor.jpg?quality=100',
        genres: 'action',
        restriction: '18'
      },
      {
        title: '3 hours of concept art',
        poster:
          'https://i.pinimg.com/originals/a0/86/b7/a086b774291cf85b5810372bd83815b3.jpg',
        genres: 'action',
        restriction: '18'
      },
      {
        title: '3 hours of concept art',
        poster:
          'https://www.bestmovieposters.co.uk/wp-content/uploads/2019/01/bPhD22m-.jpeg',
        genres: 'action',
        restriction: '18'
      }
    ]
  ];

  constructor() {}

  ngOnInit() {}
}
