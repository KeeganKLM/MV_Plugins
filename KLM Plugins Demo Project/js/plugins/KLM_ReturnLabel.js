//-------------------------------------------------------------------------------
//  "Return Label" Plugin for RPG Maker MV
//  By Keegan Mackey
//  Filename should be: KLM_ReturnLabel.js
//-------------------------------------------------------------------------------
 
 var KLM = KLM || {};
 KLM.ReturnLabel = KLM.ReturnLabel || {};
 KLM.ReturnLabel.version = "1.000";
 KLM.Console = KLM.Console || {};
 
 KLM.cLog = KLM.cLog || function(logInfo)
 {
    if (KLM.Console.ReturnLabel === true)
       console.log(logInfo);
 }
 
//-------------------------------------------------------------------------------
//  RPG Maker MV Plugin Description
//-------------------------------------------------------------------------------
/*:
 * @plugindesc Return to a "Jump to Label" statement after it's called!
 * 
 * 
 * @author KeeganKLM
 * 
 * 
 * @param Console Log
 * @type boolean
 * @on Show Console Log
 * @off Hide Console Log
 * @default false
 * @desc Output plugin processing information onto console log?
 * Helpful insight if your Return Labels aren't working right.
 * 
 * @param Prefix Value
 * @type text
 * @default "Return: "
 * @desc See 'Plugin Parameters' in description for more info.
 * NOTE: Be sure to put " on both ends. Default: "Return: "
 * 
 * @param RETURN Value
 * @type text
 * @default "RETURN"
 * @desc See 'Plugin Parameters' in description for more info.
 * NOTE: Be sure to put " on both ends. Default: "RETURN"
 * 
 * 
 * @help
 * ------------------------------------------------------------------------------
 *                               Abstract (Summary)
 * ------------------------------------------------------------------------------
 *      
 *      After calling a 'Jump to Label' statement, you may return to
 *   that same statement when a specific 'Jump to Label' is called.
 *      
 *      Jump to Label: "Return: x"
 *         where 'x' is the label the system will look for.
 *      
 *      Jump to Label: "RETURN"
 *         Use this when you want to go back to where "Return: x" is.
 *      
 *      
 * ------------------------------------------------------------------------------
 *                               Table of Contents
 * ------------------------------------------------------------------------------
 *    1. Instructions
 *    2. Example Usage
 *    3. Commands
 *    4. Plugin Parameters
 *    5. Compatibility
 *    6. Troubleshooting
 *    7. Version History 
 *    8. Rights/Usage
 *    9. Shameless Self-Promotion
 * ------------------------------------------------------------------------------
 *                               1. Instructions
 * ------------------------------------------------------------------------------
 *      
 *   [Jump to Label: "x"]
 *      
 *      Using "Return: Label123" for "x" will cause the system to go to the 
 *   first label named "Label123". In other words, it acts as if you had 
 *   instead called [Jump to Label: "Label123"].
 *      
 *      Once the system runs into a [Jump to Label: "RETURN"], it will jump back 
 *   to the most recently called [Jump to Label: "Return: Label123"] statement.
 *      
 *      This can go multiple layers deep, if you so desire, calling multiple
 *   "Return: Label" statements before reaching a "RETURN" statement.
 *   As long as you reach as many "RETURN" statements as you've called 
 *   "Return: Label" statements, the plugin will work as intended.
 *      
 *      Be warned, however, that if a "Return: Label" does not ever meet a
 *   "RETURN" inside of an event, then the game will still remember the
 *   last "Return: Label" that it came across. This can cause future problems
 *   if/when you call more "Return: Label" and "RETURN" statements within 
 *   another event later on.
 *      In the "Commands" section, the first listed command is a
 *   workaround to this.
 *      
 *      
 * ------------------------------------------------------------------------------
 *                               2. Example Usage
 * ------------------------------------------------------------------------------
 *      
 *         (Start of Event)
 *         ...code 1...
 *         [Jump to Label: "Return: Random Talk 1"]
 *         ...code 3...
 *         [Exit Event Processing]
 *         [Label: "Random Talk 1"]
 *         ...code 2...
 *         [Jump to Label: "RETURN"]
 *         (End of Event)
 *      
 *      This will return as:
 *         ...code 1...
 *         ...code 2...
 *         ...code 3...
 *      
 *      
 * ------------------------------------------------------------------------------
 *                                 3. Commands
 * ------------------------------------------------------------------------------
 *      
 *   Plugin Command: ReturnLabel ForgetAll
 *   Script: ReturnLabelArray = [];
 *      
 *      This will remove all of the "Return: Label"s that the game still has
 *   in its memory. This is helpful for resetting, in case there's an event
 *   that has a difference in the amount of "Return: "s and "RETURN"s.
 *      If you don't use Return Labels that often (or even if you do),
 *   you could also put this at the beginning of an event to prevent
 *   having issues with any previous event's unRETURNed "Return: "s.
 *      
 *      
 *   Plugin Command: ReturnLabel ForgetLast
 *   Plugin Command: ReturnLabel Pop
 *   Script: ReturnLabelArray.pop();
 *      
 *      This will make the system forget the most recently memorized
 *   "Return: Label". It's as if it had run into a "RETURN", but without
 *   actually returning anywhere.
 *      This can help if you'd like to cancel a return.
 *      
 *      
 *   Plugin Command: ReturnLabel ForgetLast x
 *   Plugin Command: ReturnLabel Pop x
 *      x = a whole number
 *      
 *      This will do the same thing as the previous command, but
 *   will perform the action 'x' times.
 *      
 *      
 *   Plugin Command: Console ReturnLabel on/true/off/false/switch/toggle
 *      
 *      This will change whether the plugin will output information onto
 *   the console or not.
 *      Putting "on" or "true" will turn it on.
 *      Putting "off" or "false" will turn it off.
 *      Putting "switch" or "toggle" will reverse it;
 *         Turns it off if it's on, and turns it on if it's off.
 *      
 *      
 * ------------------------------------------------------------------------------
 *                             4. Plugin Parameters
 * ------------------------------------------------------------------------------
 *      
 *      If you would rather use something else in the place of "Return: " or 
 *   "RETURN", you can change the plugin values to have them be other terms.
 *      
 *      
 *      Prefix Value
 *         Default: "Return: "
 *      
 *      If the "x" in [Jump to Label: "x"] begins with the Prefix Value,
 *   then the system will memorize where it currently is, and jump to
 *   a label that matches whatever is after the Prefix Value.
 *      
 *      
 *      RETURN Value
 *         Default: "RETURN"
 *      
 *      If the "x" in [Jump to Label: "x"] matches the RETURN Value,
 *   then it will jump to the most recently memorized label's location.
 *      
 *      
 *      Console Log
 *         Default: false
 *      
 *      This setting doesn't change anything in the actual game, but if set
 *   to 'true', it will output the processing information of this plugin to
 *   the console while your testplay is running. This can help you identify
 *   what's going wrong with the plugin if it's not working as it should be.
 *      The numbers that appear in the console log are the line numbers that
 *   the "Return: Label"s are located on. Remember that this starts at 0, so
 *   line 1 has a value of 0, and line 100 has a value of 99.
 *      The console can be accessed (on Windows) by pressing f12 on your
 *   keyboard while your testplay game is running.
 *      
 *      
 * ------------------------------------------------------------------------------
 *                               5. Compatibility
 * ------------------------------------------------------------------------------
 *      
 *      This plugin should only be incompatible with plugins that directly 
 *   modify the "Label" and "Jump to Label" methods, which very few (if any?) 
 *   other plugins actually do.
 *      
 *      
 * ------------------------------------------------------------------------------
 *                              6. Troubleshooting
 * ------------------------------------------------------------------------------
 *      
 *      This section will be updated based on what problems get brought up to
 *   me after it's released. Since this is the first release, I have not yet
 *   received any submissions for this, and don't know what issues are likely
 *   to come up. Expect this portion to be updated with future versions.
 *      
 *      If you are having problems with this plugin, you can set the 'Console 
 *   Log' plugin parameter to 'true' to output the plugin's processing info
 *   to the console while the game is running.
 *      (On Windows, you can open the console with f12.)
 *      
 *      While the Console Log is on, this plugin may cause framerate issues
 *   if several "Jump to Label" statements are being called at a time.
 *      
 *      
 * ------------------------------------------------------------------------------
 *                               7. Version History
 * ------------------------------------------------------------------------------
 *   v1.000 - Release on 2019-12-16 at 14:22
 *      > First official release.
 *      
 *      
 * ------------------------------------------------------------------------------
 *                                8. Rights/Usage
 * ------------------------------------------------------------------------------
 *      
 *    > This is free to use for all games of any kind. Except hentai.
 *    > I request that you notify me about your game when you release it.
 *    > Credit is appreciated, but not in any way necessary.
 *          I'm just happy I could help out!
 *      
 *      You are allowed to edit the plugin, but I request the following: 
 *      > You add somewhere (preferably at the top and/or in the plugin 
 *        description) noting that you modified this plugin and/or that
 *        it is not the officially released version. Here are some simple
 *        examples that are fine:
 *           "This plugin has been modified from its original version."
 *           "Echo607 has modified this plugin."
 *      > You may not edit this in such a way that it distorts my own 
 *        views or opinions. As a silly example, if I say on this document
 *        that I like pizza, you are free to delete it, but you may not 
 *        reword it to say that I dislike pizza.
 *      
 *      Things you are not allowed to remove:
 *      > "KeeganKLM" as the original author.
 *      
 *      
 * ------------------------------------------------------------------------------
 *                          9. Shameless Self-Promotion
 * ------------------------------------------------------------------------------
 *      
 *      If you would like to help support my college fund, everything helps!
 *      https://www.paypal.com/paypalme2/KeeganMackey
 *      
 *      If you have any questions, comments, or concerns, I respond fastest 
 *   to my email account:
 *      keeganmackey250(at)gmail(dot)com
 *      
 *      I also have a GitHub that I made recently:
 *      https://github.com/KeeganKLM
 *      
 *      
 */
 
 //   Delete the lines above+below this for the 'technical stuff' to appear in MV. 
 //   These weren't included because I felt that it would distract/confuse people.
 //   If a plugin has one main function but can do 50 other small things, they
 // might focus on the 50 things that don't matter as much.
 
 /*
 *      
 * ------------------------------------------------------------------------------
 *                              x. Technical Stuff
 * ------------------------------------------------------------------------------
 *      
 *   Plugin Command: ReturnLabel Push x
 *   Script: ReturnLabelArray.push(x);
 *      x = a whole number
 *      
 *      The 'x' represents the line of your code (in the RPG Maker MV event 
 *   editor) that is being kept track of. Keep in mind that lines start count 
 *   at 0, so line 1's value is 0, and line 10's value is 9.
 *      This will cause the next "RETURN" to bring you to line 'x', as if
 *   a "Return: Label" was placed there and was called.
 *      I don't know the reason why, but keep in mind that the line called
 *   should be either a Label or a Comment; for some reason the interpreter
 *   likes to either ignore it or execute it, so it's safest to put something
 *   on that line that doesn't do anything. (It's probably related to the fact
 *   that it thinks it's being called to a label.)
 *      
 *      
 *   Plugin Command: ReturnLabel LearnNew LabelName
 *      LabelName = The name of an existing Label.
 *      
 *      This will memorize 'LabelName', but not go to it.
 *      I other words, it's like you called [Jump to Label: "Return: LabelName"],
 *   but without actually going to 'LabelName'.
 *      
 *      
 */
 
//-------------------------------------------------------------------------------
// Setting Plugin Parameters
//-------------------------------------------------------------------------------
 
 KLM.ReturnLabel = PluginManager.parameters('KLM_ReturnLabel');
 KLM.ReturnLabel.Prefix = String(KLM.ReturnLabel['Prefix Value']);
 KLM.ReturnLabel.RETURN = String(KLM.ReturnLabel['RETURN Value']);
 KLM.Console.ReturnLabel = eval(String(KLM.ReturnLabel['Console Log']));
 
 // This gets rid of the "" in the input.
 // Without requiring the "", 'Return: ' would come back as 'Return:'
 // Which would then make "Return: My Label" think the label is " My Label", not "My Label"
 KLM.ReturnLabel.Prefix = KLM.ReturnLabel.Prefix.substring(1, KLM.ReturnLabel.Prefix.length-1)
 KLM.ReturnLabel.RETURN = KLM.ReturnLabel.RETURN.substring(1, KLM.ReturnLabel.RETURN.length-1)
 
//-------------------------------------------------------------------------------
//  Actual Code
//-------------------------------------------------------------------------------

 var ReturnLabelArray = [];
 var KLM_ReturnLabel_InputType = 0;
    // 0 = Do nothing; normal label
    // 1 = System received "Return: "
    // 2 = System received "RETURN"
 
 var _CmdReplace_KLM_RL_GoToLabel = Game_Interpreter.prototype.command119;
 
 if ( KLM.ReturnLabel.Prefix === KLM.ReturnLabel.RETURN )
    console.log('WARNING:\n   Prefix Value and RETURN Value are both "' + KLM.ReturnLabel.Prefix + '".\n   This will cause KLM_LabelReturn.js to not work as intended.')
    // is this line necessary?
 else
    KLM.Console.ReturnLabel ? console.log('ReturnLabel_Prefix = "' + KLM.ReturnLabel.Prefix + '"\nReturnLabel_RETURN = "' + KLM.ReturnLabel.RETURN + '"') : null;
 
 Game_Interpreter.prototype.command119 = function()
    {
       _CmdReplace_KLM_RL_GoToLabel.call(this);
       
       var labelName = this._params[0];
       var xtra = 0;
       
       if (labelName === KLM.ReturnLabel.RETURN)
       {
          KLM_ReturnLabel_InputType = 2;
          xtra = 1;
          KLM.Console.ReturnLabel ? console.log('Detected: "' + KLM.ReturnLabel.RETURN + '"\n   labelName = ' + labelName) : null;
       } else if (labelName.substr(0, KLM.ReturnLabel.Prefix.length) === KLM.ReturnLabel.Prefix)
       {
          KLM_ReturnLabel_InputType = 1;
          labelName = labelName.substr(8);
          KLM.Console.ReturnLabel ? console.log('Detected: "' + KLM.ReturnLabel.Prefix + '"\n   labelName = ' + labelName) : null;
       } else
       {
          KLM_ReturnLabel_InputType = 0;
          KLM.Console.ReturnLabel ? console.log('Detected normal label.\n   labelName = ' + labelName) : null;
       }
       
       for (var i = 0; i < this._list.length; i++)
       {
          var command = this._list[i];
          if (command.code === (118+xtra) && command.parameters[0] === labelName)
          {
             this.jumpTo(i);
             return;
          }
       }
       KLM.Console.ReturnLabel ? console.log('Could not find matching label.') : null;
       return true;
    }
 
 Game_Interpreter.prototype.jumpTo = function(index)
 {
    if (KLM_ReturnLabel_InputType === 1)
    {
       ReturnLabelArray.push(this._index+1);
       KLM.Console.ReturnLabel ? console.log('Executed: "' + KLM.ReturnLabel.Prefix + '"\n   Saved Line: ' + (this._index+1)) : null;
    }
    
    if (KLM_ReturnLabel_InputType === 2)
    {
       index = ReturnLabelArray.pop();
       KLM.Console.ReturnLabel ? console.log('Executed: "' + KLM.ReturnLabel.RETURN + '"\n   Jumping to Line: ' + index + '\n   Indexing skipped.') : null;
    }
    else // Doesn't need to find "label" on a 'RETURN'. Doing so would reset the previous step anyway.
    {
       var lastIndex = this._index;
       var startIndex = Math.min(index, lastIndex);
       var endIndex = Math.max(index, lastIndex);
       var indent = this._indent;
       for (var i = startIndex; i <= endIndex; i++)
       {
          var newIndent = this._list[i].indent;
          if (newIndent !== indent) 
          {
             this._branch[indent] = null;
             indent = newIndent;
          }
       }
    }
    
    KLM.Console.ReturnLabel ? console.log('Jump To Line: ' + index) : null;
    this._index = index;
 };
 
 Game_Interpreter.prototype.findLabel = function(labelName)
 {
    ;
 }
 
//-------------------------------------------------------------------------------
// Plugin Commands
//-------------------------------------------------------------------------------
 
 _cmdReplace_KLM_RL_PluginCommand = Game_Interpreter.prototype.pluginCommand;
 Game_Interpreter.prototype.pluginCommand = function(command, args)
 {
    _cmdReplace_KLM_RL_PluginCommand.call(this, command, args);
    var error_x = false;
    var cmd1 = command;
    var cmd2 = args[0];
    var x = args[1];
    var consoleText = 'Plugin Command: ';
    if (cmd1 === 'ReturnLabel' && cmd2 !== 'Console')
    {
       consoleText += cmd1 + ' ';
       if (cmd2 === 'ForgetAll')
       {
          consoleText += cmd2 + ' ';
          ReturnLabelArray = [];
       }
       else if (cmd2 === 'ForgetLast' || cmd2 === 'Pop')
       {
          consoleText += cmd2 + ' ';
          if (x === undefined) // If x was never typed, assume it's 1.
          {
             x = 1;
             consoleText += '(empty)';
          }
          if (x % 1 !== 0) // If x is a decimal
          {
             error_x = true;
             consoleText += '\n   ERROR: Argument "' + x + '" is not a whole number.';
          }
          else
          {
             while ( x > 0 )
             {
                var temp = ReturnLabelArray.pop();
                consoleText += '\n   ReturnLabelArray Popped: ' + temp;
                x -= 1;
             }
          }
       }
       else if (cmd2 === 'Push')
       {
          consoleText += cmd2 + ' ' + x;
          if (x === undefined) // If x was never typed
          {
             error_x = true;
             consoleText += '\n   ERROR: Did not receive an argument for "' + cmd2 + '" command. (Should be a whole number.)';
          }
          else if (x % 1 !== 0) // If x is a decimal
          {
             error_x = true;
             consoleText += '\n   ERROR: Argument "' + x + '" is not a whole number.';
          }
          else // Everything's fine; no errors!
          {
             consoleText += '\n   ReturnLabel Array Pushed: ' + x;
             ReturnLabelArray.push(x);
          }
       }
       else if (cmd2 === 'LearnNew')
       {
          consoleText += cmd2 + ' ' + x;
          if (x === undefined) // If x was never typed
          {
             error_x = true;
             consoleText += '\n   ERROR: Did not receive an argument for "' + cmd2 + '" command. (Should be a whole number.)';
          }
          else // Everything's (probably) fine; no errors!
          {
             for (var i = 0; i < this._list.length; i++)
             {
                var command = this._list[i];
                if (command.code === 118 && command.parameters[0] === x)
                {
                   consoleText += '\n   ReturnLabel Array Pushed: ' + i;
                   ReturnLabelArray.push(i);
                   return;
                }
             }
             KLM.Console.ReturnLabel ? console.log('Could not find matching label.') : null;
             return;
          }
       }
    }
    if ((cmd1 === 'Console' && cmd2 === 'ReturnLabel')
     || (cmd1 === 'ReturnLabel' && cmd2 === 'Console'))
    {
       consoleText += cmd1 + ' ' + cmd2 + ' ' + x;
       var xText = x.toLowerCase();
       if (xText === 'true' || xText === 'on')
          KLM.Console.ReturnLabel = true;
       else if (xText === 'false' || xText === 'off')
          KLM.Console.ReturnLabel = false;
       else if (xText === 'switch' || xText === 'toggle')
       {
          if (KLM.Console.ReturnLabel === true)
             KLM.Console.ReturnLabel = false;
          if (KLM.Console.ReturnLabel === false)
             KLM.Console.ReturnLabel = true;
       }
       else 
          consoleText += '\n   Error: Unfamiliar argument: ' + x;
       
       if (KLM.Console.ReturnLabel === true)
          consoleText += '\n   Console for KLM_ReturnLabel is on.';
       if (KLM.Console.ReturnLabel === false)
          consoleText += '\n   Console for KLM_ReturnLabel is off.';
       console.log(consoleText);
    }
    if (KLM.Console.ReturnLabel && cmd1 !== 'Console' && cmd2 !== 'Console')
       console.log(consoleText);
 };
 
