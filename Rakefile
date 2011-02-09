require 'rubygems'

task :default => ["spec:browser"]

desc "rebuild the evented.js file for distribution and specs files for testing"
task :build do
  print "source processing... "
  begin
    require 'coffee_script'
  rescue LoadError
    puts "coffee_script compiler not found.\nInstall it by running 'gem install coffee-script'"
    exit
  end

  Dir.glob('spec/*.coffee').each do |filepath|
    File.open(filepath.gsub('.coffee', '.js'), 'w+') do |file|
      file.write CoffeeScript.compile File.read filepath
    end
  end

  File.open('evented.debug.js', 'w+') do |file|
    file.write CoffeeScript.compile File.read "evented.coffee"
  end

  begin
    require 'closure-compiler'
  rescue LoadError
    puts "closure-compiler not found.\nInstall it by running 'gem install closure-compiler'"
    exit
  end
  source = File.read 'evented.debug.js'
  header = source.match(/^\(function\(\)\s*\{.*(\/\*.*\*\/)/m)
  File.open('evented.js', 'w+') do |file|
    file.puts header[1].squeeze(' ')
    file.write Closure::Compiler.new.compress(source)
  end
  puts "done."
end

namespace :spec do
  desc "run specs for evented.js in browser"
  task :browser => [:build] do
    print "opening browser... "
    begin
      require 'launchy'
    rescue LoadError
      puts "launchy not found.\nInstall it by running 'gem install launchy'"
      exit
    end
    Launchy::Browser.run("file://#{Dir.pwd}/spec/spec.html")
    puts "done."
  end

  desc "run specs for evented.js in console - require run jtestdriver server (rake spec:server)"
  task :console => [:build] do
    check_jstdutil
    system "jstestdriver --tests all"
  end

  desc "run specs for evented.js in autotest mode - require run jtestdriver server (rake spec:server)"
  task :autotest => [:build] do
    check_jstdutil
    system "jsautotest"
  end

  desc "run jstestdriver server"
  task :server => [:build] do
    check_jstdutil
    system "jstestdriver --port 4224"
  end

  desc "connect browser to jstestdriver server"
  task :connect  => [:build] do
    begin
      require 'launchy'
    rescue LoadError
      puts "launchy not found.\nInstall it by running 'gem install launchy'"
      exit
    end
    Launchy::Browser.run "http://127.0.0.1:4224"
  end
end

desc "build the docco documentation"
task :doc => [:build] do
  check 'docco', 'docco', 'https://github.com/jashkenas/docco'
  system 'docco evented.js'
end

desc "run JavaScriptLint on the source"
task :lint => [:build] do
  system "jsl -nofilelisting -nologo -conf jsl.conf -process evented.js"
end

def check_jstdutil
  check "jstestdriver", "Jstdutil", "'gem install jstdutil'"
end

# Check for the existence of an executable.
def check(exec, name, url)
  return unless `which #{exec}`.empty?
  puts "#{name} not found.\nInstall it from #{url}"
  exit
end

