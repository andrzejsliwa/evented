require 'rubygems'

HEADER = /((^\s*\/\/.*\n)+)/

desc "rebuild the jquery.evented-min.js files for distribution"
task :build do
  begin
    require 'closure-compiler'
  rescue LoadError
    puts "closure-compiler not found.\nInstall it by running 'gem install closure-compiler'"
    exit
  end
  source = File.read 'jquery.evented.js'
  header = source.match(HEADER)
  File.open('jquery.evented-min.js', 'w+') do |file|
    file.write header[1].squeeze(' ') + Closure::Compiler.new.compress(source)
  end
end

namespace :spec do
  desc "run specs for jquery.evented.js in browser"
  task :browser do
    begin
      require 'launchy'
    rescue LoadError
      puts "launchy not found.\nInstall it by running 'gem install launchy'"
      exit
    end
    Launchy::Browser.run("file://#{Dir.pwd}/spec/spec.html")
  end

  desc "run specs for jquery.evented.js in console - require run jtestdriver server (rake spec:server)"
  task :console do
    check_jstdutil
    system "jstestdriver --tests all"
  end

  desc "run specs for jquery.evented.js in autotest mode - require run jtestdriver server (rake spec:server)"
  task :autotest do
    check_jstdutil
    system "jsautotest"
  end

  desc "run jstestdriver server"
  task :server do
    check_jstdutil
    system "jstestdriver --port 4224"
  end

  desc "connect browser to jstestdriver server"
  task :connect do
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
task :doc do
  check 'docco', 'docco', 'https://github.com/jashkenas/docco'
  system 'docco jquery.evented.js'
end

desc "run JavaScriptLint on the source"
task :lint do
  system "jsl -nofilelisting -nologo -conf jsl.conf -process jquery.evented.js"
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
