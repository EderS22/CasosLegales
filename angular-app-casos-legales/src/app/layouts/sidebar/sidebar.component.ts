import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from './menu.model';
import { pantalla } from '../../pages/models/acceso/pantalla';
import { RolService } from '../../pages/services/acceso/rol/rol.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menu: pantalla[] = [];
  menuAcce: MenuItem[] = [];
  menuGral: MenuItem[] = [];
  menuCale: MenuItem[] = [];
  menuTemp: any;
  toggle: any = true;
  menuItems: MenuItem[] = [];
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(private router: Router, public translate: TranslateService, private rolService: RolService) {
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.rolService.getPantallasPorRolYAdmin(JSON.parse(localStorage.getItem("currentUser") || '').role_Id, JSON.parse(localStorage.getItem("currentUser") || '').usua_EsAdmin)
    .subscribe((data:any) => {
        if(data.code === 200){
            this.menu = data.data;

            this.menu.forEach(item => {
                if(item.pant_Esquema === 'Acceso'){
                    const menuAcceTemp = new MenuItem();
        
                    menuAcceTemp.id = item.pant_Id;
                    menuAcceTemp.label = item.pant_Pantalla;
                    menuAcceTemp.icon = item.pant_Icono;
                    menuAcceTemp.link = item.pant_Href;
        
                    this.menuAcce.push(menuAcceTemp);
                }
        
                if(item.pant_Esquema === 'General'){
                    const menuGralTemp = new MenuItem();
        
                    menuGralTemp.id = item.pant_Id;
                    menuGralTemp.label = item.pant_Pantalla;
                    menuGralTemp.icon = item.pant_Icono;
                    menuGralTemp.link = item.pant_Href;
        
                    this.menuGral.push(menuGralTemp);
                }
        
                if(item.pant_Esquema === 'CasosLegales'){
                    const menuCaleTemp = new MenuItem();
        
                    menuCaleTemp.id = item.pant_Id;
                    menuCaleTemp.label = item.pant_Pantalla;
                    menuCaleTemp.icon = item.pant_Icono;
                    menuCaleTemp.link = item.pant_Href;
        
                    this.menuCale.push(menuCaleTemp);
                }
            });
        
            if(this.menuAcce.length > 0){
                const itemMenu = new MenuItem();
        
                itemMenu.label = 'ACCESO';
                itemMenu.isTitle = true;
        
                this.menuItems.push(itemMenu);
                this.menuAcce.forEach(item => {
                    this.menuItems.push(item);
                })
            }
        
            if(this.menuGral.length > 0){
                const itemMenu = new MenuItem();
        
                itemMenu.label = 'GENERAL';
                itemMenu.isTitle = true;
        
                this.menuItems.push(itemMenu);
                this.menuGral.forEach(item => {
                    this.menuItems.push(item);
                })
            }
        
            if(this.menuCale.length > 0){
                const itemMenu = new MenuItem();
        
                itemMenu.label = 'CASOS LEGALES';
                itemMenu.isTitle = true;
        
                this.menuItems.push(itemMenu);
                this.menuCale.forEach(item => {
                    this.menuItems.push(item);
                })
            }

        }
    })
  }

  /***
   * Activate droup down set
   */
  ngAfterViewInit() {
    this.initActiveMenu();
  }

  removeActivation(items: any) {
    items.forEach((item: any) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        (item.nextElementSibling) ? item.nextElementSibling.classList.remove("show") : null;
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  }

  toggleSubItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    let dropDowns = Array.from(document.querySelectorAll('.sub-menu'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });

    let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
    subDropDowns.forEach((submenu: any) => {
      submenu.setAttribute('aria-expanded',"false");
    });
    
    if (event.target && event.target.nextElementSibling){
      isCurrentMenuId.setAttribute("aria-expanded", "true");
      event.target.nextElementSibling.classList.toggle("show");
    }
  };

  toggleExtraSubItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    let dropDowns = Array.from(document.querySelectorAll('.extra-sub-menu'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });

    let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
    subDropDowns.forEach((submenu: any) => {
      submenu.setAttribute('aria-expanded',"false");
    });
    
    if (event.target && event.target.nextElementSibling){
      isCurrentMenuId.setAttribute("aria-expanded", "true");
      event.target.nextElementSibling.classList.toggle("show");
    }
  };

  // Click wise Parent active class add
  toggleParentItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName("a"));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
      activeIconItems.forEach((item: any) => {
        item.setAttribute('aria-expanded', "false")
        item.classList.remove("active");
      });
    }
    isCurrentMenuId.setAttribute("aria-expanded", "true");
    if (isCurrentMenuId) {
      this.activateParentDropdown(isCurrentMenuId);
    }
  }

  toggleItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    if (isMenu.classList.contains("show")) {
      isMenu.classList.remove("show");
      isCurrentMenuId.setAttribute("aria-expanded", "false");
    } else {
      let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
      dropDowns.forEach((node: any) => {
        node.classList.remove('show');
      });
      (isMenu) ? isMenu.classList.add('show') : null;
      const ul = document.getElementById("navbar-nav");
      if (ul) {
        const iconItems = Array.from(ul.getElementsByTagName("a"));
        let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
        activeIconItems.forEach((item: any) => {
          item.setAttribute('aria-expanded', "false")
          item.classList.remove("active");
        });
      }
      isCurrentMenuId.setAttribute("aria-expanded", "true");
      if (isCurrentMenuId) {
        this.activateParentDropdown(isCurrentMenuId);
      }
    }
  }
  
  activateParentDropdown(item:any) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
        // to set aria expand true remaining
        parentCollapseDiv.classList.add("show");
        parentCollapseDiv.parentElement.children[0].classList.add("active");
        parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
        if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
            parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
            if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
            if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse")) {
                parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").classList.add("show");
                parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").previousElementSibling.classList.add("active");
            }
        }
        return false;
    }
    return false;
  }

  updateActive(event: any) {
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
  }

  initActiveMenu() {
    const pathName = window.location.pathname;
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      let activeItems = items.filter((x: any) => x.classList.contains("active"));
      this.removeActivation(activeItems);

      let matchingMenuItem = items.find((x: any) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  } 

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    var sidebarsize = document.documentElement.getAttribute("data-sidebar-size");
    if (sidebarsize == 'sm-hover-active') {
      document.documentElement.setAttribute("data-sidebar-size", 'sm-hover')
    } else {
      document.documentElement.setAttribute("data-sidebar-size", 'sm-hover-active')
    }
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
   SidebarHide() {
    document.body.classList.remove('vertical-sidebar-enable');
  }

}
