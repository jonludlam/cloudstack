// Copyright 2012 Citrix Systems, Inc. Licensed under the
// Apache License, Version 2.0 (the "License"); you may not use this
// file except in compliance with the License.  Citrix Systems, Inc.
// reserves all rights not expressly granted by the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Automatically generated by addcopyright.py at 04/03/2012
(function($, cloudStack) {
  /**
   * Login process
   */
  cloudStack.uiCustom.login = function(args) {
    var $container = args.$container;
    var $login = $('#template').find('.login').clone();
    var $form = $login.find('form');
    var $inputs = $form.find('input[type=text], input[type=password]');
    var complete = args.complete;
    var bypass = args.bypassLoginCheck && args.bypassLoginCheck();

    // Check to see if we can bypass login screen
    if (bypass) {
      complete({
        user: bypass.user
      });

      return;
    }

    $login.appendTo('html body');
    $('html body').addClass('login');

    // Form validation
    $form.validate();

    // Form label behavior
    $inputs.bind('keydown keyup focus blur', function(event) {
      var $target = $(event.target);
      var $label = $form.find('label').filter(function() {
        return $(this).attr('for') == $target.attr('name');
      });

      if (event.type == 'keydown') {
        $label.hide();

        return true;
      } else {
        if (!$target.val()) {
          $label.show();
        } else {
          $label.hide();
        }
      }

      return true;
    });

    if (!args.hasLogo) $login.addClass('nologo');

<<<<<<< HEAD
    // Labels cause related input to be focused
=======
   // Labels cause related input to be focused
>>>>>>> 2e82439... Hide Citrix logo if no EULA is present (i.e., is OSS version)
    $login.find('label').click(function() {
      var $input = $inputs.filter('[name=' + $(this).attr('for') + ']');

      $input.focus();
    });

    $inputs.filter(':first').focus();

    // Login action
    $login.find('input[type=submit]').click(function() {
      if (!$form.valid()) return false;

      var data = cloudStack.serializeForm($form);

      args.loginAction({
        data: data,
        response: {
          success: function(args) {
            $login.remove();
            $('html body').removeClass('login');
            complete({
              user: args.data.user
            });
          },
          error: function(args) {
            cloudStack.dialog.notice({ message: args });
          }
        }
      });

      return false;
    });

    // Select language
    var $languageSelect = $login.find('select[name=language]');
    $languageSelect.change(function() {
      $.cookie('lang', $(this).val());
      document.location.reload();
    });

    // Set default language
    if (!$.cookie('lang')) {
      $.cookie('lang', 'en');
    }

    $languageSelect.val($.cookie('lang'));
  };
})(jQuery, cloudStack);
