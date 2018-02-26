﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;


namespace DataAccessLibrary.Models
{
    public class ContactDBContext : DbContext
    {
        public virtual DbSet<Contacts> Contacts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //Add new database 

            }
        }
        
        //Configure the database for message 
        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<Contacts>(entity =>
            {
                entity.HasKey(e => e.ContactsId);
                entity.Property(e => e.Email).HasMaxLength(50)
                .IsUnicode(false);
                entity.Property(e => e.FirstName).
                        HasMaxLength(50)
                        .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .IsUnicode(false);

            });  
        }

    }
}