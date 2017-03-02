import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe, 
    UpvoteComponent ,
    VoterService,
    LocationValidator
} from './events/index'
import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { Error404Component } from './errors/404.component'
import { JQ_TOKEN, TOASTR_TOKEN, Toastr, CollpasibleWellComponent, SimpleModalComponent, ModalTriggerDirective } from './common/index'
import { appRoutes } from './routes'
import { AuthService } from './user/auth.service'

declare let toastr: Toastr;
declare let jQuery : Object;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations:[
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        CreateEventComponent,
        NavBarComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollpasibleWellComponent,
        SimpleModalComponent,
        DurationPipe,
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator
    ],
    providers: [
        EventService,
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        },
        {
            provide: JQ_TOKEN,
            useValue: jQuery
        },
        EventRouteActivator,
        EventListResolver,
        VoterService,
        AuthService,
        {
            provide: 'canDeactivateCreateEvent',//this should be an OpaqueToken? no, in this case its ok, we want to use OpaqueToken for things like services that are actually injected into components and other services, but for something like this its ok to use the string.  
            useValue: checkDirtyState
        }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule{

}

function checkDirtyState(component: CreateEventComponent){
    console.log('executing guard');
    if(component.isDirty){
        return window.confirm('You have not saved this event, do you really want to cancel?')
    }

    return true
}