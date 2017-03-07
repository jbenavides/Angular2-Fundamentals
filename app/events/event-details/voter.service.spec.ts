import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { Observable } from 'rxjs/Rx'

describe('VoterService', () => {

    let voterService : VoterService;
    let mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            var session : any = {id: 6, voters: ['jose', 'john']};
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(<ISession> session,'jose', 3);

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('john');
        });

        it('should call http.delete with the right URL', () => {
            var session : any = {id: 6, voters: ['jose', 'john']};
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(<ISession> session,'jose', 3);

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/jose')
        });
    });

    describe('addVoter', () => {
        it('should call http.post with the right URL', () => {
            var session : any = {id: 6, voters: ['john']};
            mockHttp.post.and.returnValue(Observable.of(false));

            voterService.addVoter(<ISession>session, 'jose', 3);

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/jose', '{}', jasmine.any(Object));
        })
    })    
})