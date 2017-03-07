import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core'
import { SessionListComponent } from './session-list.component'
import { UpvoteComponent } from './upvote.component'
import { DurationPipe } from '../shared/duration.pipe'
import { CollpasibleWellComponent } from '../../common/collapsible-well.component'
import { AuthService } from '../../user/auth.service'
import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { By } from '@angular/platform-browser'

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement;
    
    beforeEach(async(() => {
        let mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {userName: 'Jose'}
        };
        let mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                //UpvoteComponent,
                DurationPipe,
               // CollpasibleWellComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService},
                { provide: VoterService, useValue: mockVoterService}
            ],
            schemas: [
                NO_ERRORS_SCHEMA //with this we told angular, dont worry about HTML elements and properties that you dont recognize, upComponent and CollpasibleWellComponent can be ignored ....but be careful using this, because it can hide other problems that we need to take in count
            ]
        }).compileComponents();
    }));

    beforeEach(()=>{
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    })

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [{id:3, name: 'Session 1', presenter: 'Jose', duration: 1, level:'beginner', abstract:'abstract', voters: ['bob', 'esponja']}];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1'); //another way to do above expect
        })
    })

})

