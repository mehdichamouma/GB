<template>
      <div class="container body">
        <div class="main_container">
          <div class="col-md-3 left_col">
            <div class="left_col scroll-view">
              <div class="navbar nav_title" style="border: 0;">
                <a href="index.html" class="site_title"><img src="/logo.png" height="50" /> <span>GB Stock</span></a>
              </div>

              <div class="clearfix"></div>

              <!-- menu profile quick info -->
              <div class="profile clearfix">
                <div class="profile_pic">

                </div>
                <div class="profile_info">
                  <span>Welcome,</span>
                  <h2>John Doe</h2>
                </div>
              </div>
              <!-- /menu profile quick info -->

              <br />

              <!-- sidebar menu -->
              <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
                <div class="menu_section">
                  <h3>General</h3>
                  <ul class="nav side-menu">
                    <li><a><i class="fa fa-edit"></i> Utilisateurs <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <li><router-link :to="{name: 'users'}" >Liste des utilisateurs</router-link></li>
                        <li><router-link :to="{name: 'createUser'}">Ajouter un utilisateur</router-link></li>
                      </ul>
                    </li>
                    <li><a><i class="fa fa-desktop"></i> Lieux de stockage <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <li><router-link :to="{name: 'places'}" >Liste des lieux de stockage</router-link></li>
                        <li><router-link :to="{name: 'createPlace'}" >Ajouter un lieu de stockage</router-link></li>
                      </ul>
                    </li>
                    <li><a><i class="fa fa-table"></i> Categories <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <li><router-link :to="{name: 'categories'}" >Liste des categories</router-link></li>
                        <li><router-link :to="{name: 'createCategory'}">Ajouter une categorie</router-link></li>
                      </ul>
                    </li>
                    <li><a><i class="fa fa-desktop"></i> Fournisseurs <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <li><router-link :to="{name: 'providers'}" >Liste des fournisseurs</router-link></li>
                        <li><router-link :to="{name: 'createProvider'}" >Ajouter un fournisseur</router-link></li>
                      </ul>
                    </li>
                    <li><a><i class="fa fa-clone"></i>Produits <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <li><router-link :to="{name: 'products'}" >Liste des produits</router-link></li>
                        <li><router-link :to="{name: 'createProduct'}" >Ajouter un produit</router-link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="menu_section">
                  <h3>Live On</h3>
                  <ul class="nav side-menu">
                    <li><a><i class="fa fa-bug"></i> Additional Pages <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <li><a href="e_commerce.html">E-commerce</a></li>
                        <li><a href="projects.html">Projects</a></li>
                        <li><a href="project_detail.html">Project Detail</a></li>
                        <li><a href="contacts.html">Contacts</a></li>
                        <li><a href="profile.html">Profile</a></li>
                      </ul>
                    </li>
                    <li><a><i class="fa fa-windows"></i> Extras <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                        <li><a href="page_403.html">403 Error</a></li>
                        <li><a href="page_404.html">404 Error</a></li>
                        <li><a href="page_500.html">500 Error</a></li>
                        <li><a href="plain_page.html">Plain Page</a></li>
                        <li><a href="login.html">Login Page</a></li>
                        <li><a href="pricing_tables.html">Pricing Tables</a></li>
                      </ul>
                    </li>
                    <li><a><i class="fa fa-sitemap"></i> Multilevel Menu <span class="fa fa-chevron-down"></span></a>
                      <ul class="nav child_menu">
                          <li><a href="#level1_1">Level One</a>
                          <li><a>Level One<span class="fa fa-chevron-down"></span></a>
                            <ul class="nav child_menu">
                              <li class="sub_menu"><a href="level2.html">Level Two</a>
                              </li>
                              <li><a href="#level2_1">Level Two</a>
                              </li>
                              <li><a href="#level2_2">Level Two</a>
                              </li>
                            </ul>
                          </li>
                          <li><a href="#level1_2">Level One</a>
                          </li>
                      </ul>
                    </li>
                    <li><a href="javascript:void(0)"><i class="fa fa-laptop"></i> Landing Page <span class="label label-success pull-right">Coming Soon</span></a></li>
                  </ul>
                </div>

              </div>
              <!-- /sidebar menu -->

              <!-- /menu footer buttons -->
              <div class="sidebar-footer hidden-small">
                <a data-toggle="tooltip" data-placement="top" title="Settings">
                  <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                  <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Lock">
                  <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                </a>
                <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                  <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
                </a>
              </div>
              <!-- /menu footer buttons -->
            </div>
          </div>

          <!-- top navigation -->
          <div class="top_nav">
            <div class="nav_menu">
              <nav>
                <div class="nav toggle">
                  <a class="menu_toggle"><i class="fa fa-bars"></i></a>
                </div>

                <ul class="nav navbar-nav navbar-right">
                  <li class="">
                    <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                      <img src="images/img.jpg" alt="">John Doe
                      <span class=" fa fa-angle-down"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-usermenu pull-right">
                      <li><a href="javascript:;"> Profile</a></li>
                      <li>
                        <a href="javascript:;">
                          <span class="badge bg-red pull-right">50%</span>
                          <span>Settings</span>
                        </a>
                      </li>
                      <li><a href="javascript:;">Help</a></li>
                      <li><a href="login.html"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
                    </ul>
                  </li>

                  <li role="presentation" class="dropdown">
                    <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                      <i class="fa fa-envelope-o"></i>
                      <span class="badge bg-green">6</span>
                    </a>
                    <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
                      <li>
                        <a>
                          <span class="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                          <span>
                            <span>John Smith</span>
                            <span class="time">3 mins ago</span>
                          </span>
                          <span class="message">
                            Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span class="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                          <span>
                            <span>John Smith</span>
                            <span class="time">3 mins ago</span>
                          </span>
                          <span class="message">
                            Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span class="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                          <span>
                            <span>John Smith</span>
                            <span class="time">3 mins ago</span>
                          </span>
                          <span class="message">
                            Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span class="image"><img src="images/img.jpg" alt="Profile Image" /></span>
                          <span>
                            <span>John Smith</span>
                            <span class="time">3 mins ago</span>
                          </span>
                          <span class="message">
                            Film festivals used to be do-or-die moments for movie makers. They were where...
                          </span>
                        </a>
                      </li>
                      <li>
                        <div class="text-center">
                          <a>
                            <strong>See All Alerts</strong>
                            <i class="fa fa-angle-right"></i>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <!-- /top navigation -->
          <div class="right_col" role="main">
          <!-- page content -->
            <router-view></router-view>
          <!-- /page content -->
          </div>
          <!-- footer content -->
          <footer>
            <div class="pull-right">
              Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>
            </div>
            <div class="clearfix"></div>
          </footer>
          <!-- /footer content -->

      </div>
    </div>
</template>

<script>
//import {getNotificationSocket, setToken} from "../ApiClient"
export default {
  data: function() {
    return {
      showNotifications: false,
    }
  },
  methods: {

  },
  mounted() {
    (function($,sr){
        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var debounce = function (func, threshold, execAsap) {
          var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap)
                        func.apply(obj, args);
                    timeout = null;
                }

                if (timeout)
                    clearTimeout(timeout);
                else if (execAsap)
                    func.apply(obj, args);

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

        // smartresize
        jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery,'smartresize');

    $(document).ready(function() {
      var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
      $BODY = $('body'),
      $MENU_TOGGLE = $('#menu_toggle'),
      $SIDEBAR_MENU = $('#sidebar-menu'),
      $SIDEBAR_FOOTER = $('.sidebar-footer'),
      $LEFT_COL = $('.left_col'),
      $RIGHT_COL = $('.right_col'),
      $NAV_MENU = $('.nav_menu'),
      $FOOTER = $('footer');
      // TODO: This is some kind of easy fix, maybe we can improve this
      var setContentHeight = function () {
      	// reset height
      	$RIGHT_COL.css('min-height', $(window).height());

      	var bodyHeight = $BODY.outerHeight(),
      		footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
      		leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
      		contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

      	// normalize content
      	contentHeight -= $NAV_MENU.height() + footerHeight;

      	$RIGHT_COL.css('min-height', contentHeight);
      };

        $SIDEBAR_MENU.find('a').on('click', function(ev) {
      	  console.log('clicked - sidebar_menu');
              var $li = $(this).parent();

              if ($li.is('.active')) {
                  $li.removeClass('active active-sm');
                  $('ul:first', $li).slideUp(function() {
                      setContentHeight();
                  });
              } else {
                  // prevent closing menu if we are on child menu
                  if (!$li.parent().is('.child_menu')) {
                      $SIDEBAR_MENU.find('li').removeClass('active active-sm');
                      $SIDEBAR_MENU.find('li ul').slideUp();
                  }else
                  {
      				if ( $BODY.is( ".nav-sm" ) )
      				{
      					$SIDEBAR_MENU.find( "li" ).removeClass( "active active-sm" );
      					$SIDEBAR_MENU.find( "li ul" ).slideUp();
      				}
      			}
                  $li.addClass('active');

                  $('ul:first', $li).slideDown(function() {
                      setContentHeight();
                  });
              }
          });
      console.log("im here");
      // toggle small or large menu
      console.log($(".menu_toggle").length)
      $('.menu_toggle').on('click', function() {
      		console.log('clicked - menu toggle');

      		if ($BODY.hasClass('nav-md')) {
      			$SIDEBAR_MENU.find('li.active ul').hide();
      			$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
      		} else {
      			$SIDEBAR_MENU.find('li.active-sm ul').show();
      			$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
      		}

      	$BODY.toggleClass('nav-md nav-sm');

      	setContentHeight();
      });

      console.log("im here 2");
      	// check active menu
      	$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

      	$SIDEBAR_MENU.find('a').filter(function () {
      		return this.href == CURRENT_URL;
      	}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
      		setContentHeight();
      	}).parent().addClass('active');

      	// recompute content when resizing
      	$(window).smartresize(function(){
      		setContentHeight();
      	});

      	setContentHeight();

      	// fixed sidebar
      	if ($.fn.mCustomScrollbar) {
      		$('.menu_fixed').mCustomScrollbar({
      			autoHideScrollbar: true,
      			theme: 'minimal',
      			mouseWheel:{ preventDefault: true }
      		});
      	}
    })

  },
  computed: {

  }
}
</script>

<style>
.logo {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 300;
  font-size: 24px;
  margin-left: 5px;
}
.menu-logo {
  height: 22px;
  margin-left: 10px;
  //width: 100px;
  color: "abc"
}
.awimarket-notifications {
  width: 100%;
  padding: 0;
  //position: absolute;
}
.notifications-content {
  background-color: blue;
  margin: auto;
  width: 90%;
  position: relative;
}
.content {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
main {
  flex: 1 0 auto;
}
.crop {
  height: 64px;
  width: 58px;
  overflow: "hidden";
  padding-top: 7px;
}
.crop img {
  height: 50px;
  width: 50px;
  margin: auto;
  display: block;
}
</style>
