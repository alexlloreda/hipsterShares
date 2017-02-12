import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SecurityDetailComponent } from '../../../../../../main/webapp/app/entities/security/security-detail.component';
import { SecurityService } from '../../../../../../main/webapp/app/entities/security/security.service';
import { Security } from '../../../../../../main/webapp/app/entities/security/security.model';

describe('Component Tests', () => {

    describe('Security Management Detail Component', () => {
        let comp: SecurityDetailComponent;
        let fixture: ComponentFixture<SecurityDetailComponent>;
        let service: SecurityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [SecurityDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    SecurityService
                ]
            }).overrideComponent(SecurityDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SecurityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SecurityService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Security(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.security).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
