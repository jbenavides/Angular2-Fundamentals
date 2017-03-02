import { Component } from '@angular/core'
import { AuthService } from '../user/auth.service'
import { ISession, EventService } from "../events/index";

@Component({
    selector: 'nav-bar',
    templateUrl: 'app/nav/navbar.component.html',
    styles: [`
        li > a.active { color: #F97924 }
        .nav.navbar-nav { font-size: 15px}
        #searchForm {margin-right: 100px}
        @media (max-width: 1200px){#searchForm {display:none}}
    `]
})
export class NavBarComponent{

    searchTerm: string = "";
    foundSessions: ISession[];

    constructor(private auth: AuthService,
                private eventService: EventService
                ){}

    searchSession(searchTerm: string){
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {this.foundSessions = sessions; console.log(this.foundSessions)});
    }
 
}