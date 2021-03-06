import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'
import { AuthService } from '../../user/auth.service'
import { VoterService } from './voter.service'

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html',
    styles:[`
        collapsible-well h6 {margin-top: -5px; margin-bottom:10px}
    `]
})
export class SessionListComponent implements OnChanges {
        
    @Input() sessions: ISession[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;
    visibleSessions: ISession[] = [];

    constructor(private auth: AuthService,
                private voterService: VoterService){}

    ngOnChanges(): void { //is going to be called every time one of the input variables of the component gets a new value
        if(this.sessions){
            this.filterSession(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    toggleVote(session: ISession){
        if(this.userHasVoted(session)){
            this.voterService.deleteVoter(session, this.auth.currentUser.userName, this.eventId);
        }else{
            this.voterService.addVoter(session, this.auth.currentUser.userName, this.eventId);
        }

        if(this.sortBy === 'votes')
            this.visibleSessions.sort(sortByVotesDesc);
    }

    userHasVoted(session: ISession){
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName)
    }

    filterSession(filter : string){
        if(filter === 'all'){
            this.visibleSessions = this.sessions.slice(0); //cloning the list
        }else{
            this.visibleSessions = this.sessions
                                    .filter(
                                        session => 
                                        { 
                                            return session.level.toLocaleLowerCase() === filter
                                        });
        }
    }

}

function sortByNameAsc(s1: ISession, s2: ISession){
    if(s1.name > s2.name) return 1;
    else if(s1.name === s2.name) return 0;
    else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession){
    return s2.voters.length - s1.voters.length;
}