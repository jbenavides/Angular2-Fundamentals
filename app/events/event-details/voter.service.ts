import { Injectable } from '@angular/core'
import { ISession } from "../index";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class VoterService{

    constructor(private http: Http){}    

    deleteVoter(session: ISession, voterName: string, eventId: number){
        session.voters = session.voters.filter(voter => voter !== voterName);

        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

        this.http.delete(url).catch(this.handleError).subscribe();
    }

    addVoter(session: ISession, voterName: string, eventId: number){
        session.voters.push(voterName);

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

        this.http.post(url, JSON.stringify({}), options).catch(this.handleError).subscribe(); //we pass empty object because all data is in the url

    }

    userHasVoted(session: ISession, voterName: string){
        return session.voters.some(voter => voter === voterName);
    }

    private handleError(error: Response){
        return Observable.throw(error.statusText);
    }

}