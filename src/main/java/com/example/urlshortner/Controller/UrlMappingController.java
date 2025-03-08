package com.example.urlshortner.Controller;

import com.example.urlshortner.dtos.ClickEventDTO;
import com.example.urlshortner.dtos.UrlMappingDTO;
import com.example.urlshortner.models.User;
import com.example.urlshortner.service.UrlMappingService;
import com.example.urlshortner.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {
  @Autowired
  private UrlMappingService urlMappingService;
  @Autowired
  private UserService userService;
  @PreAuthorize("hasRole('USER')")
  @PostMapping("/shorten")
    public ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String,String> request,
                                                        Principal principal){
      String originalUrl = request.get("originalUrl");
      User user = userService.findByUserName(principal.getName());
      UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl, user);
      return  ResponseEntity.ok(urlMappingDTO);

  }
  @GetMapping("/myurl")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal){
    User user = userService.findByUserName(principal.getName());
    List<UrlMappingDTO> urlMappingDTOS = urlMappingService.getUrlsByUser(user);
    return ResponseEntity.ok(urlMappingDTOS);
  }
  @GetMapping("/analytics/{shortUrl}")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                             @RequestParam("startDate") String startDate,
                                                             @RequestParam("endDate") String endDate){
    DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
    LocalDateTime start = LocalDateTime.parse(startDate,formatter);
    LocalDateTime end = LocalDateTime.parse(endDate,formatter);
    List<ClickEventDTO> clickEventDTOS = urlMappingService.getClickEventsByDate(shortUrl , start , end);
    return ResponseEntity.ok(clickEventDTOS);
  }
  @GetMapping("/totalclicks")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal,
                                                                   @RequestParam("startDate") String startDate,
                                                                   @RequestParam("endDate") String endDate){
    User user = userService.findByUserName(principal.getName());
    DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
    LocalDate start = LocalDate.parse(startDate,formatter);
    LocalDate end = LocalDate.parse(endDate,formatter);
    Map<LocalDate , Long> totalClicks = urlMappingService.getTotalClicksByUserAndDate(user , start , end);
    return ResponseEntity.ok(totalClicks);
  }

}
