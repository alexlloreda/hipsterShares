import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SecurityLotDetailComponent } from '../../../../../../main/webapp/app/entities/security-lot/security-lot-detail.component';
import { SecurityLotService } from '../../../../../../main/webapp/app/entities/security-lot/security-lot.service';
import { SecurityLot } from '../../../../../../main/webapp/app/entities/security-lot/security-lot.model';

describe('Component Tests', () => {

    describe('SecurityLot Management Detail Component', () => {
        let comp: SecurityLotDetailComponent;
        let fixture: ComponentFixture<SecurityLotDetailComponent>;
        let service: SecurityLotService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [SecurityLotDetailComponent],
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
                    SecurityLotService
                ]
            }).overrideComponent(SecurityLotDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SecurityLotDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SecurityLotService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new SecurityLot(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.securityLot).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
